export const quizesjs = [
  {
    id: 1,
    pic: true,
    question: "Что будет выведено в консоли?",
    options: [
      "Lydia и undefined",
      "Lydia и ReferenceError",
      "ReferenceError и 21",
      "undefined и ReferenceError",
    ],
    correct_option_id: 3,
    explanation:
      'Внутри функции мы сперва определяем переменную name с помощью ключевого слова var. Это означает, что переменная будет поднята (область памяти под переменную будет выделена во время фазы создания) со значением undefined по умолчанию, до тех пора пока исполнение кода не дойдет до строчки, где определяется переменная. Мы еще не определили значение name когда пытаемся вывести её в консоль, поэтому в консоли будет undefined. Переменные, определенные с помощью let (и const), также поднимаются, но в отличие от var, не инициализируются. Доступ к ним не возможен до тех пор, пока не выполнится строка их определения (инициализации). Это называется "временная мертвая зона". Когда мы пытаемся обратиться к переменным до того момента как они определены, JavaScript выбрасывает исключение ReferenceError.',
    startdif: 1,
    open_period: 5,
  },
  {
    id: 2,
    pic: true,
    question: "Что будет выведено в консоли?",
    options: ["0 1 2 и 0 1 2", "0 1 2 и 3 3 3", "3 3 3 и 0 1 2"],
    correct_option_id: 2,
    explanation:
      "Из-за очереди событий в JavaScript, функция setTimeout вызывается после того как цикл будет завершен. Так как переменная i в первом цикле была определена с помощью var, она будет глобальной. В цикле мы каждый раз увеличиваем значение i на 1, используя унарный оператор ++. К моменту выполнения функции setTimeout значение i будет равно 3 в первом примере. Во втором цикле переменная i определена с помощью let. Такие переменные (а также const) имеют блочную область видимости (блок это что угодно между { }). С каждой итерацией i будет иметь новое значение, и каждое значение будет замкнуто в своей области видимости внутри цикла.",
    startdif: 1,
    open_period: 5,
  },
  {
    id: 3,
    pic: true,
    question: "Что будет выведено в консоли?",
    options: ["20 и 62.83185307179586", "20 и NaN", "20 и 63", "NaN и 63"],
    correct_option_id: 1,
    explanation:
      "Заметь, что diameter это обычная функция, в то время как perimeter это стрелочная функция. У стрелочных функций значение this указывает на окружающую область видимости, в отличие от обычных функций! Это значит, что при вызове perimeter значение this у этой функции указывает не на объект shape, а на внешнюю область видимости (например, window). У этого объекта нет ключа radius, поэтому возвращается undefined.",
    startdif: 1,
    open_period: 5,
  },
  {
    id: 4,
    pic: true,
    question: "Что будет выведено в консоли?",
    options: ["1 и false", "false и NaN", "false и false"],
    correct_option_id: 0,
    explanation:
      'Унарный плюс приводит операнд к числу. true это 1, а false это 0. Строка \'Lydia\' это "истинное" значение. На самом деле мы спрашиваем "является ли это истинное значение ложным"? Ответ: false.',
    startdif: 1,
    open_period: 5,
  },
  {
    id: 5,
    pic: true,
    question: "Что НЕ является валидным?",
    options: [
      "mouse.bird.size",
      "mouse[bird.size]",
      'mouse[bird["size"]]',
      "Все варианты валидны",
    ],
    correct_option_id: 0,
    explanation:
      'В JavaScript все ключи объекта являются строками (кроме Symbol). И хотя мы не набираем их как строки, они всегда преобразовываются к строкам под капотом. \n JavaScript интерпретирует (или распаковывает) операторы. При использовании квадратных скобок JS замечает [ и продолжает пока не встретит ]. Только после этого он вычислит то, что находится внутри скобок. \n mouse[bird.size]: Сперва определяется bird.size, которое равно "small". mouse["small"] возвращает true. \n Но с записью через точку так не происходит. У mouse нет ключа bird. Таким образом, mouse.bird равно undefined. Затем мы запрашиваем ключ size, используя точечную нотацию: mouse.bird.size. Так как mouse.bird это undefined, мы запрашиваем undefined.size. Это не является валидным, и мы получаем ошибку типа Cannot read property "size" of undefined.',
    startdif: 1,
    open_period: 5,
  },
  /*
  {
    id: 5,
    pic: true,
    question: "Что будет выведено в консоли?",
    options: [""],
    correct_option_id: 0,
    explanation: "",
    startdif: 1,
    open_period: 5,
  },
  */
];
