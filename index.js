const fs = require('fs');
const getJSON = require('get-json');

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

const getData = () => {
    setTimeout(() => console.log('Starting Transfer . . .'), 2000);
    questions.forEach(questionItem => {
        for (let i = 0; i < 9; i++) {
            getJSON(`https://questions.aloc.ng/api/q/40?subject=${questionItem}`, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                res.data.forEach(item => {
                    const question = {
                        subject: res.subject,
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
                    fs.appendFile(`${questionItem}.json`, JSON.stringify(questionsArray), (err) => {
                        if (err) {
                            return console.error(err);
                        }
                        fs.closeSync(1);
                        console.log('Saving questions');
                        questionsArray = [];
                    });
                });
            });
        }
    });
}

getData();

// const sortQuestions = () => {
//     let sortedQuestions = [];
//     questions.forEach(question => {
//         fs.readFile(`${question}.json`, 'utf8', (err, data) => {
//             if (err) {
//                 return console.error(err);
//             }
//             sortedQuestions = [...data];
//             sortedQuestions = sortedQuestions.filter((item, index) => data.indexOf(item) !== index);
//             console.log(sortQuestions);
//             fs.writeFileSync(`${question}.json`, JSON.parse(sortedQuestions), (err) => {
//                 if (err) {
//                     return console.error(err)
//                 }
//                 console.log(`Removed ${question} duplicates`);
//             });
//         });
//     });
// }

// sortQuestions();

// function startTransfer (callback) {
//     console.log('Starting download. . . . . . .');
//     getData();
//     if (typeof callback === 'function') {
//         callback();
//     }
// }