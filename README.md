# Тестовое задание Apicode
## Необходимо
Сформировать приложениет to do list-а, в котором можно: 
 1.  Авторизаваться из данных в json-server-е.
 2.  Перекидывать данныех из json сервера в качестве первичных данных для mobx.
 3.  Добавлять задачи.
 4.  Изменять их статус.
 5.  Удалять задачи.
 6.  Фильтровать задачи.


## Процесс сборки 

После установки проекта на локальную ситсему, для корректной работы необзолимо запустить его с помощью следующей последовательности: 
1. Запусить json-server с помощью комадны `json-server db.json -m ./node_modules/json-server-auth`
2. Запустить сам проект с используя `npm start `

## Необходимо исправить 

На странице входа в кнопке ничего не написано (должно быть "Войти" например), просто пустая кнопка. Далее, прямо в коде есть комментарий "Необходимо будет понять на необходимый url", то есть кандидат осознанно скинул недоделанное задание. ☑️
- [x] Добавить текст в кнопку входа 



Можно зайти в приложение, минуя авторизацию, просто по пути "/todos", получается, что авторизации как таковой тут нет, она бесполезна, нет приватных роутов и тд. ☑️
- [x] Разобраться в чем причина проблемы 
- [x] Завернуть navigate (от react route) с проверкой на наличие куки с данными от логина в useEffect (он оказывается не работал из-за этого)

При любых взаимодействиях с задачами никакие запросы на бекенд не отправляются, при переключении между разделами "выполненные/невыполненные" никаких запросов не отправляется
- [ ] Понять как можно сделать адекватное отображение данных 
- [ ] Исправить добавление и удаление данных (сделать его адекватно через сервер)
- [ ] Исправить фильтрацию
- [ ] Понять как сделать адекватно переключение данных
