const fs = require('fs');
const axios = require('axios');

const questions = [
    'english', 
    'mathematics', 
    'commerce', 
    'accounting', 
    'biology', 
    'physics',
    'chemistry', 
    'englishlit', 
    'government', 
    'crk', 
    'geography', 
    'economics',
    'irk',
    'civiledu', 
    'insurance', 
    'currentaffairs', 
    'history'
];

let questionsArray = [];

questions.forEach(item => {
    for (let i = 0; i < 999; i++) {
        axios.get(`https://questions.aloc.ng/api/q/100?subject=${item}`)
        .then(res => {
            const { data } = res;
            data.data.forEach(item => {
                const question = {
                    subject: data.subject,
                    "headers": [
                        {"text": ""},
                        {"image": ""}
                    ],
                    year: item.examyear,
                    type: item.examtype.toUpperCase(),
                    number: item.id,
                    question: item.question,
                    options: {
                        A: item.option.a,
                        B: item.option.b,
                        C: item.option.c,
                        D: item.option.d
                    },
                    answer: item.answer,
                    solution: item.solution,
                    image: item.image
                };
                questionsArray.push(question);
            });
        })
        .catch(err => console.error(err));
    }
    fs.appendFileSync(`${item}.json`, JSON.stringify(questionsArray), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('file written');
    });
    questionsArray = [];
});