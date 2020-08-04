require('@babel/polyfill');
import Search from './model/search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import Recipe from './model/recipe';

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
    const query = searchView.getInput();


    if (query) { //Хэрвээ query хувьсагч нь хоосон биш юмтай байх юм бол энэ блок ажиллана.

        // 2.Шинээр хайлтын объектийг үүсгэж өгнө.
        state.search = new Search(query);

        // 3.Хайлт хийхэд зориулж дэлгэцийн UI -ийг бэлтгэнэ.
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv);


        // 4.Хайлтыг гүйцэтгэнэ.
        await state.search.doSearch();

        // 5.Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
        clearLoader();
        if (state.search.result === undefined) alert('Хайлтаар илэрцгүй байна!!!')
        else searchView.renderRecipes(state.search.result);
    }

};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //Хайх товчлуур дээр дарахад submit хийдэг default үйлдлийг зогсоож байна.
    controlSearch();
});

elements.pageButtons.addEventListener('click', e => {
    const btn = e.target.closest(".btn-inline"); // closest функц нь pageButtons буюу results__pages div дотор байгаа .btn-inline classtai аль нэг курсортой ойр дарагдсан div tag-ийг сонгоно.

    // console.log(btn);

    if (btn) {
        const gotoPageNumber = parseInt(btn.dataset.goto);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }

});

const r = new Recipe(47746);
r.getRecipe();