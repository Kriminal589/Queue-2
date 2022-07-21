# Queue-2
Лучшая очередь для студентов.

# Описание серверной части.
В БД представленно несколько таблиц, таких как:

+ Первая таблица. Student - таблица, описывающая такую сущность, как студент. В таблице присутствуют такие поля: id, NameOfStudent (ВАЖНО, имя должно приходить в формате Имя_Фамилия), domain (домен берется от вк), idHeadman. Контроллер этой таблицы принимает все запросы, если после ip-адреса сервера стоит адрес "/student". Контроллер принимает несколько запросов:
    + 1. ip-server/student/add/{id}/{NameOfStudent}/{domain} - GET запрос на добавление студента.
    + 2. ip-server/student/all - GET запрос, который вернет JSon пакет, в котором будут все студенты и их данные.
    + 3. ip-server/student/getById/{idStudent} - GET запрос, который находит студента по его id, указанному в теле запроса, и возвращает Json пакет. Если студента с таким id нет БД, то сервер вернет NULL.
    + 4. ip-server/student/getByNameOfStudent/{NameOfStudent} - GET запрос, который находит всех студентов по имени, указанному в теле запроса, и возвращает Json пакет. Если студентов с таким именем нет БД, то сервер вернет NULL.

+ Вторая таблица. Queue - таблица, описывающая сущность очереди. В таблице присутствуют такие поля: id, type (simple or smart), SubjectName, dateToPass (срок сдачи одной задачи), countApps (количество задач, которые предусмотрены программой обучения), currentApp (номер актуальной задачи для сдачи), dependOnApps (поле указывающее, нужна ли в очереди зависимость от количества задач), dependOnDate (поле указывающее, нужна ли в очереди зависимость от срока сдачи задачи). Контроллер этой таблицы принимает все запросы, если после ip-адреса сервера стоит адрес "/queue". Контроллер принимает несколько запросов:
    + 1. ip-server/queue/add/{SubjectName}/{type}/{dependOnApps}/{countApps}/{dependOnDate}/{dateToPass} - GET запрос, который добавляет очередь, в которой предусмотрены все возможные настройки очереди (smart queue).
    + 2. ip-server/queue/add/{SubjectName}/{type} - GET запрос, который создает simple очередь, которая работает по принципу FILO.
    + 3. ip-server/queue/add/{SubjectName}/{type}/{dependOnApps}/{countApps}/{dependOnDate} - GET запрос, который добавляет очередь, зависящую от кол-ва задач, но независящую от срока сдачи задачи.
    + 4. ip-server/queue/add/{SubjectName}/{type}/{dependOnApps}/{dependOnDate}/{dateToPass} - GET запрос, который добавляет очередь, зависящую от срока сдачи задачи, но независящую от кол-ва задач.
    + 5. ip-server/queue/all - GET запрос, который возвращает JSon пакет, со всеми очередями и их полями.
    + 6. ip-server/queue/get/{idQueue} - GET запрос, возвращающий Json пакет по id очереди.

+ Третья таблица. ListOfQueues - таблица, описывающая связь студента и очередь. Один студент может записаться на разные очереди, так же может быть создано много очередей на один и тот же предмет, чтобы сохранить все эти связи существует эта таблица. Представлены такие поля: id, idStudent, idQueue, positionStudent (поле отображает позицию студента в очереди), numberOfAppStudent (номер задачи, которую сдает студент. Будет предусмотрена возможность остаться в очереди, записавшись сразу с задачей со следующим номером), currentApp (номер актуальной задачи, можно отображать пользователю или нет, но это важное поле для умной сортировки). Контроллер этой таблицы принимает все запросы, если после ip-адреса сервера стоит адрес "/listOfQueues". Контроллер принимает несколько запросов:
    + 1. ip-server/listOfQueues/add/{idQueue}/{idStudent}/{numberOfAppStudent} - GET запрос, который создает эту связь студента и очереди (происходит добавления студента к очереди). Номер задачи на данном этапе указывается обязательно, но в дальнейшем может быть создан запрос, в котором достаточно будет указать только id студента и очереди.
    + 2. ip-server/listOfQueues/all - GET запрос, возвращающий все связи в JSon пакете.
    + 3. ip-server/listOfQueues/getByIdStudent/{idStudent} - GET запрос, передающий JSon пакет, со всеми очередями, в которых состоит студент с указанным id. Если таких связей нет, то будет возвращено NULL.
    + 4. ip-server/listOfQueues/getByIdQueue/{idQueue} - GET запрос, на получение пакета формата Json со всеми студентам в списке очереди.
