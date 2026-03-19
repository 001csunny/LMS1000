import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SpeechService {
  private readonly logger = new Logger(SpeechService.name);
  private readonly isConfigured: boolean;
  private gcpCredentials: object | null = null;

  constructor() {
    const credentialsJson = process.env.GCP_CREDENTIALS_JSON;

    if (credentialsJson) {
      try {
        this.gcpCredentials = JSON.parse(credentialsJson);
        this.isConfigured = true;
        this.logger.log('GCP Speech-to-Text service initialized.');
      } catch {
        this.isConfigured = false;
        this.logger.warn(
          'GCP_CREDENTIALS_JSON is set but could not be parsed — speech features disabled.',
        );
      }
    } else {
      this.isConfigured = false;
      this.logger.warn(
        'GCP_CREDENTIALS_JSON not set — speech-to-text features are disabled.',
      );
    }
  }

  /**
   * Transcribe a base64-encoded LINEAR16 audio payload using the GCP
   * Speech-to-Text v1 REST API. The frontend records audio, encodes it
   * to base64, and POSTs the payload here so the GCP API key never
   * leaves the server.
   *
   * Returns null when GCP is not configured (graceful no-op).
   */
  async transcribe(
    audioBase64: string,
    sampleRateHertz = 48000,
  ): Promise<string | null> {
    if (!this.isConfigured || !this.gcpCredentials) {
      this.logger.warn('transcribe() called but GCP is not configured.');
      return null;
    }

    // Runtime import to avoid hard dependency when not configured
    const fetch = (await import('node-fetch')).default;

    const credentials = this.gcpCredentials as {
      client_email: string;
      private_key: string;
    };

    // Exchange service-account credentials for a short-lived access token
    const { GoogleAuth } = await import('google-auth-library').catch(() => {
      throw new Error(
        'google-auth-library not installed. Run: pnpm add google-auth-library',
      );
    });

    const auth = new GoogleAuth({
      credentials,
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
    });

    const accessToken = await auth.getAccessToken();

    const body = {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz,
        languageCode: 'th-TH',
        enableAutomaticPunctuation: true,
      },
      audio: { content: audioBase64 },
    };

    const response = await fetch(
      'https://speech.googleapis.com/v1/speech:recognize',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`GCP STT error: ${errorText}`);
      return null;
    }

    const data = (await response.json()) as {
      results?: { alternatives: { transcript: string }[] }[];
    };

    const transcript = data?.results
      ?.map((r) => r.alternatives[0]?.transcript)
      .filter(Boolean)
      .join(' ');

    return transcript ?? null;
  }
}
