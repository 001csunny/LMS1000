# LMS Frontend Refactoring Documentation

## Overview
This document outlines the comprehensive refactoring of the LMS frontend to implement OOP principles, uniform theming, and support for new backend features.

## Architecture & Refactoring (OOP Focus)

### Base Service Class
- **Location**: `src/services/BaseService.js`
- **Purpose**: Provides generic CRUD operations with consistent error handling
- **Features**:
  - Automatic JWT token management
  - Global error handling (401, 403, 404, 500)
  - Request/response interceptors
  - Consistent API response formatting

### Specialized Service Classes
- **UserService** (`src/services/UserService.js`): User management operations
- **CourseService** (`src/services/CourseService.js`): Course operations including public courses
- **LessonService** (`src/services/LessonService.js`): Lesson operations including public lessons
- **AuthService** (`src/services/AuthService.js`): Authentication and token management

### Component Reusability
- **UI Components** (`src/components/ui/`): Reusable components with consistent styling
- **Custom Hooks** (`src/hooks/useApi.js`): Reusable state management logic

## Shared Interfaces & Types

### Domain Models
- **Location**: `src/types/index.js`
- **Classes**: `User`, `Course`, `Lesson`, `Challenge`, `Test`, `Exam`, `Word`, `Progress`
- **Request Models**: `CreateUserRequest`, `CreateCourseRequest`, `CreateLessonRequest`
- **Features**:
  - Built-in validation methods
  - Helper methods (e.g., `isAdmin()`, `getStudentCount()`)
  - Type safety and consistency

## Feature Integration (Backend Alignment)

### Admin Dashboard
- **Location**: `src/page/AdminDashboard.jsx`
- **Features**:
  - User management (create, delete users)
  - Course management (create, delete courses with public/private toggle)
  - Lesson management (create lessons with public/private toggle)
  - Tab-based interface for different resource types
  - Modal-based forms with validation

### Public Landing Page
- **Location**: `src/page/PublicCourses.jsx`
- **Features**:
  - Browse public courses without authentication
  - Browse public lessons without authentication
  - Search functionality
  - Responsive grid layout
  - Call-to-action for registration

### Permission-Based UI
- **Role-based routing** in `src/main.jsx`
- **Conditional rendering** based on user roles
- **Protected routes** with role requirements

## Design & UX (Theme Consistency)

### Design System
- **Location**: `src/theme/theme.js`
- **Features**:
  - Modern EdTech color palette
  - Consistent typography scale
  - Spacing system
  - Component-specific styling
  - CSS custom properties injection

### Reusable UI Components
- **Button**: Multiple variants (primary, secondary, success, warning, danger)
- **Card**: Different variants (default, elevated, outlined, success, warning, error)
- **Input**: Form inputs with validation states
- **Modal**: Flexible modal system with header, body, footer
- **Loading**: Multiple loading states (spinner, dots, skeleton)

### Loading & Error States
- **Custom hooks** for API state management
- **Consistent loading indicators** across all components
- **Error boundary handling** with user-friendly messages
- **Graceful degradation** for network issues

## Deliverables

### Refactored Folder Structure
```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Loading.jsx
│   │   ├── CourseCard.jsx
│   │   └── index.js
│   └── ...existing components
├── services/                    # API service layer
│   ├── BaseService.js
│   ├── UserService.js
│   ├── CourseService.js
│   ├── LessonService.js
│   └── AuthService.js
├── hooks/                       # Custom React hooks
│   └── useApi.js
├── types/                       # TypeScript-style types
│   └── index.js
├── theme/                       # Design system
│   └── theme.js
├── page/                        # Page components
│   ├── AdminDashboard.jsx
│   ├── PublicCourses.jsx
│   └── ...existing pages
└── utils/                       # Utility functions
    └── cn.js
```

### Updated Core Components
- **CourseService.js**: Now supports public courses and OOP patterns
- **AdminDashboard.jsx**: Complete admin interface with user management
- **PublicCourses.jsx**: Public browsing interface

### Code Examples

#### OOP Service Usage
```javascript
import courseService from '../services/CourseService';

// Create a public course
const courseRequest = new CreateCourseRequest({
  name: 'Thai Basics',
  description: 'Learn Thai fundamentals',
  isPublic: true
});

const result = await courseService.createCourse(courseRequest);
if (result.success) {
  // Handle success
}
```

#### Reusable Component Usage
```javascript
import { Button, Card, Modal } from '../components/ui';

<Card hover>
  <CardBody>
    <Button variant="primary" onClick={handleAction}>
      Action Button
    </Button>
  </CardBody>
</Card>
```

#### Custom Hook Usage
```javascript
import { useApi } from '../hooks/useApi';

const { data, loading, error, execute } = useApi(courseService.getPublicCourses);

useEffect(() => {
  execute();
}, []);
```

## API Integration

### New Endpoints Supported
- `GET /public/courses` - Public courses
- `GET /public/lessons` - Public lessons
- `POST /users` - Admin user creation
- `PUT /courses/:id` - Course updates (including isPublic)
- `PUT /lessons/:id` - Lesson updates (including isPublic)

### Error Handling
- Automatic token refresh on 401
- Redirect to login on unauthorized
- User-friendly error messages
- Consistent error state management

## Benefits Achieved

### DRY Principle
- Reusable components reduce code duplication
- Shared service layer eliminates API call repetition
- Custom hooks provide consistent state management

### OOP Implementation
- Clear inheritance hierarchy (BaseService → specialized services)
- Encapsulation of related functionality
- Polymorphic behavior across different entity types

### Maintainability
- Centralized theming system
- Consistent component interfaces
- Type safety with shared interfaces

### Scalability
- Easy to add new features
- Consistent patterns across the application
- Modular architecture supports growth

## Next Steps

1. **Individual Public Pages**: Create separate components for individual public courses/lessons
2. **Advanced Search**: Implement filtering and sorting
3. **Accessibility**: Add ARIA labels and keyboard navigation
4. **Testing**: Unit tests for services and components
5. **Performance**: Code splitting and lazy loading for large components

## Migration Notes

- Existing components remain functional during migration
- New patterns can be adopted incrementally
- Backward compatibility maintained where possible
- Gradual migration path for existing features
