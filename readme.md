# Тестовое задание для разработчика интерфейсов.
Поднять сервер:
```
./bin/www 
```
Собрать проект:
```
npm run build 
```

## Лирическое отступление (история вымышленная). 

После продолжительной изоляции населения в связи с COVID-19, рынок услуг и социальная инфраструктура трансформировались таким образом, что большинство услуг и развлечений стали доступны дома (online) или в непосредственной близости от него. Удаленная работа так же стала распространена гораздо шире. 

Одним из последствий этих изменений стало изменение отношения к личному транспорту. Части населения личный автомобиль перестал быть нужен постоянно, и появилась идея аренды ТС физического лица для организаций и государства.

Был объявлен тендер, на создание площадки для аукциона. Так как у нас уже есть вся необходимая информация и опыт для выкупа ТС, мы выиграли тендер. Единственное, осталось сделать интерфейс.

На первом этапе, необходимо сделать прототип формы оценки выкупа и аренды ТС.

## Детали реализации

Форма должна содержать следующие поля: 
- Категория ТС
- Марка 
- Модель

Варианты в каждом поле зависят от значения предыдущего, то есть без указания категории нельзя выбрать марку. И так далее.
Варианты для выбора нужно получить из API справочников. (ниже перечислены)

После того как пользователем заполнены все поля, нужно вывести стоимость выкупа данного ТС.
Для этого нужно сделать запрос к API [оценки](https://api.maxposter.ru/partners-api-docs/docs.html#operation/PartnersApi::Express::ExpressAction)*:
Из полученных данных использовать для стоимости выкупа значение "avgPrice", из секции "analyticsByCompletedSales" или, в случае отсутствия её, из "analyticsByActualSales".

Ниже стоимости выкупа вывести доход от аренды в день, рассчитав её следующим образом:
`
avgPrice * magicNumber / (currentYear - avgYear)
`
где:
- magicNumber равно 0.002
- currentYear равно текущему году (2020)
- avgYear получен из API оценки аналогично avgPrice
  
API
[Как использовать](https://api.maxposter.ru/partners-api-docs/docs.html#tag/Avtorizaciya)
[Получение списка категорий ТС](https://api.maxposter.ru/partners-api-docs/docs.html#operation/PartnersApi::Directory::VehicleCategories)
[Получение списка марок ТС](https://api.maxposter.ru/partners-api-docs/docs.html#operation/PartnersApi::Directory::VehicleBrands)
[Получение списка моделей ТС](https://api.maxposter.ru/partners-api-docs/docs.html#operation/PartnersApi::Directory::VehicleModels)

* Оценку нужно запросить с параметрами:
```
{
  filter: {
    brand: {
      id: int // id бренда  
    },
    model: {
      id: int // id модели
    },
    bodyTypes: ["coupe", "hatchback", "minivan", "pickup", "roadster", "sedan", "suv", "van", "universal","fastback", "liftback"]
  },
  marketFilter: {
    brand: {
      id: int // id бренда  
    },
    model: {
      id: int // id модели
    }
  },
  vehicle: {
    year: int, // год автомобиля
    rubPrice: 0,
    ptsType: 'original',
    ownerCount: 2,
    isOfficial: false,
    isOfficialByBrand: false,
    equipment: [],
    mileage: 100000
  }
}
```

## Ожидания от решения тестового

- используется Vue.js
- Плюсом будет наличие индикатора загрузки данных  
- Можно использовать TypeScript, если так удобнее 

Вопросы приветствуются. Ключ к API получить у меня.
