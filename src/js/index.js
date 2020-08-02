require('@babel/polyfill');
import Search from './model/search';

/**
 * Web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкласан жорууд
 * - Захиалж байгаа жорын найрлаганууд
 */

const state = {};

const controlSearch = async () => {

    // 1.Вебээс хайлтын түлхүүр үгийг гаргаж авна.
    const query = 'pizza';


    if (query) {
        // 2.Шинээр хайлтын объектийг үүсгэж өгнө.
        state.search = new Search(query);
        // 3.Хайлт хийхэд зориулж дэлгэцийн UI -ийг бэлтгэнэ.

        // 4.Хайлтыг гүйцэтгэнэ.
        await state.search.doSearch();

        // 5.Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
        console.log(state.search);
        console.log(state.search.result);
        console.log(state.search.query);
    }

};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault(); //Хайх товчлуур дээр дарахад submit хийдэг default үйлдлийг зогсоож байна.
    controlSearch();
});