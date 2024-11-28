const Incourse = () => {
    const { id } = useParams();
    const location = useLocation();
    const { documentID } = location.state || {};
    const [CourseData, setCourseData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = (state = !isModalOpen) => {
        setIsModalOpen(state);
    };

    const fetchCourseData = async () => {
        try {
            const data = await fetchoneCourse(documentID);
            setCourseData(data.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        fetchCourseData();
    }, []);

    return (
        <div className="flex flex-col h-screen w-screen">
            <Header />
            <div className="h-full w-full p-8">
                <div className="text-5xl mb-4">{id}</div>
                <div className="flex h-full w-full px-4">
                    <div className="w-1/5 bg-slate-700 py-8 rounded-l-3xl">
                        <button
                            onClick={() => toggleModal(true)}
                            type="button"
                            className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            + Add Lesson
                        </button>
                        <button
                            type="button"
                            className="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Edit
                        </button>
                    </div>
                    <div className="w-full rounded-r-3xl bg-slate-100 pt-4">
                        <div className="text-xl ml-8 mb-2">Total Lesson</div>
                        <div className="flex flex-wrap">
                            {CourseData && CourseData.length > 0 ? (
                                CourseData.map((course, index) => (
                                    <LessonCard
                                        key={course.id}
                                        course={course}
                                        id={course.id}
                                        name={course.name}
                                        description={course.description}
                                        student={course.students}
                                        documentId={course.documentId}
                                    />
                                ))
                            ) : (
                                <div>No Lesson available</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="default-modal"
                tabIndex={-1}
                aria-hidden={!isModalOpen ? "true" : "false"}
                className={`fixed bg-slate-500 bg-opacity-50 overflow-auto top-0 right-0 left-0 z-50 items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
                    isModalOpen ? "flex" : "hidden"
                }`}
            >
                <LessonForm
                    id="LessonForm"
                    closeModal={() => toggleModal(false)}
                />
            </div>

            <Footer />
        </div>
    );
};

export default Incourse;
