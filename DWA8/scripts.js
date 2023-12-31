// @ts-check

import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

/**
 * The html object contains constant variables that select HTML DOM elements with specific data attribute values and makes
 * them easily accessible.
 * 
 * @typedef {Object} html - html Element data attribute values
 * @prop {Object} header - HTML header data attribute values
 * @prop {Object} list - HTML list data attribute values
 * @prop {Object} search - HTML search data attribute values
 * @prop {Object} settings - HTML settings data attribute values
 */

/**
 * CONSTANTS
 * Constants using the `querySelector()` method to select elements from
 * the Document Object Model (DOM) using data attributes
 */
import { dataHeaderSearch, dataHeaderSettings, dataListItems, dataListMessage, dataListButton, dataListActive, dataListBlur, dataListImage, dataListTitle, dataListSubtitle, dataListDescription, dataListClose } from "./qSelectors.js"
import { dataSearchOverlay, dataSearchForm, dataSearchTitle, dataSearchGenres, dataSearchAuthors, dataSearchCancel, dataSettingsOverlay, dataSettingsForm, dataSettingsTheme, dataSettingsCancel } from "./qSelectors.js"

/**
 * PREVIEW BOOKS
 * This code is implementing a "Show More" feature for a list of books.
 * It initially displays 36 book previews on a page, and then when the 
 * user clicks "Show More" button, it displays the next 36 books
 */

let matches = books
let page = 1;     //used to keep track of current page of book reviews being displayed
  
/**
 * checks if books is falsy or not an array, if either is true throw error message
 * checks if range is falsy or array less than 2, if either is true throw error message
 */
const range = [0, BOOKS_PER_PAGE]
if (!books && !Array.isArray(books)) {
    throw new Error('Source required')
}

// @ts-ignore
if (!range && range.length === 2) {
    throw new Error('Range must be an array with two numbers')
}

/**
 * The createPreview() function takes a book preview object and returns 
 * a button element containing the book preview information in HTML form
 */
function createPreview(preview) {
    const { author: authorId, id, image, title } = preview;

    const showPreview = createElementWithAttributes('button', {
        class: 'preview',
        'data-preview': id,
    });

    const imageElement = createElementWithAttributes('img', {
        class: 'preview__image',
        src: image,
    });

    const infoElement = createElementWithAttributes('div', {
        class: 'preview__info',
    });

    const titleElement = createElementWithText('h3', title);

    const authorElement = createElementWithText('div', authors[authorId]);

    infoElement.append(titleElement, authorElement);
    showPreview.append(imageElement, infoElement);

    return showPreview;
}

function createElementWithAttributes(tagName, attributes) {
    const element = document.createElement(tagName);
    for (const [attrName, attrValue] of Object.entries(attributes)) {
        element.setAttribute(attrName, attrValue);
    }
    return element;
}

function createElementWithText(tagName, text) {
    const element = document.createElement(tagName);
    element.textContent = text;
    return element;
}



const startIndex = (page - 1) * BOOKS_PER_PAGE
const endIndex = startIndex + BOOKS_PER_PAGE

const bookFragment = document.createDocumentFragment()
const bookExtracted = books.slice(startIndex, endIndex)

/**
 * This loop iterates over the book previews to display on the current page, 
 * creates a book preview button using the createPreview function, and 
 * appends the button to the bookFragment container
 */
for (const preview of bookExtracted) {
    const showPreview = createPreview(preview)
    bookFragment.appendChild(showPreview)
}
// @ts-ignore
dataListItems.appendChild(bookFragment)

/**
 * This sets up a click event listener for the "Show More" button. When clicked, 
 * the code executes the logic to display the next set of book previews.
 */

dataListButton.addEventListener('click', () => {
    page++;

    const newStartIndex = (page - 1) * BOOKS_PER_PAGE
    const newEndIndex = newStartIndex + BOOKS_PER_PAGE

    const newBookExtracted = books.slice(newStartIndex, newEndIndex)

    const newBookFragment = document.createDocumentFragment()

    for (const preview of newBookExtracted) {
        const showPreview = createPreview(preview)
        newBookFragment.appendChild(showPreview)
    }

    dataListItems.appendChild(newBookFragment);

    const remaining = matches.length - page * BOOKS_PER_PAGE;
    dataListButton.innerHTML = /* HTML */ `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;

    dataListButton.disabled = remaining <= 0;
})


dataListButton.innerHTML = /* HTML */
    `<span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>
    `;


/**
 * BOOK SUMMARY
 */


// When dataListItems is clicked, it shows a modal by invoking showModal() on dataListActive.
dataListItems.addEventListener('click', (event) => {
    dataListActive.showModal()
    let pathArray = Array.from(event.path || event.composedPath())
    let active;
  
    for (const node of pathArray) {
      if (active) break;
      const id = node?.dataset?.preview
      
      for (const singleBook of books) {
        if (singleBook.id === id) {
          active = singleBook
          break;
        }
      }
    }
  
    if (!active) return;
    dataListImage.src = active.image;
    dataListBlur.src = active.image;
    dataListTitle.textContent = active.title; 
    dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    dataListDescription.textContent = active.description;
})


//When dataListClose is clicked, it closes the modal by invoking close() on dataListActive.
dataListClose.addEventListener('click', () => {
    dataListActive.close()
})


/**
 * GENRES AND AUTHORS
 * This code creates a document fragment for each 'genres' and 'authors'.
 * It sets the value of the option to "any" and the inner text to "All Genres" and "All Authors" 
 * respectively. It then loops through an object and creates an option element for each entry, 
 * setting the value to the entry's key and the inner text to its value. 
 * These option elements are added to the fragment, and the fragment is then 
 * appended to a dataSearchGenres element and dataSearchAuthors element.
 */

//When dataHeaderSearch is clicked, it shows a modal by invoking showModal() on dataSearchOverlay
dataHeaderSearch.addEventListener('click', () => {
    dataSearchOverlay.showModal()
    dataSearchTitle.focus()
})

//When dataSearchCancel is clicked, it closes modal by invoking close() on dataSearchOverlay
dataSearchCancel.addEventListener('click', () => { 
    dataSearchOverlay.close()
})

const genresFragment = document.createDocumentFragment()
const genreElement = document.createElement('option')
genreElement.value = 'any'
genreElement.innerText = 'All Genres'
genresFragment.appendChild(genreElement)

for (const [id] of Object.entries(genres)) {
    const genreElement = document.createElement('option')
    genreElement.value = id
    genreElement.innerText = genres[id]
    genresFragment.appendChild(genreElement)
}

dataSearchGenres.appendChild(genresFragment)

const authorsFragment = document.createDocumentFragment()
const authorsElement = document.createElement('option')
authorsElement.value = 'any'
authorsElement.innerText = 'All Authors'
authorsFragment.appendChild(authorsElement)

for (const [id] of Object.entries(authors)) {
    const authorsElement = document.createElement('option')
    authorsElement.value = id
    authorsElement.innerText = authors[id]
    authorsFragment.appendChild(authorsElement)
}

dataSearchAuthors.appendChild(authorsFragment)

/**
 * FILTER BOOKS BY TITLE, GENRE AND AUTHOR
 * This code sets an event listener for a search form element, dataSearchForm. 
 * When the form is submitted, the event listener prevents the default form 
 * submission behavior and instead executes a search using the provided form data.
 */

dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []
    
    /**
     * The for loop checks if any of the filters matches with the books and 
     * if its true the book gets pushed to the result array .
     */
    for (const book of books) {
        const titleMatch = filters.title.trim() !== '' && book.title.toLowerCase().includes(filters.title.toLowerCase())
        const genreMatch = filters.genre !== 'any' && book.genres.includes(filters.genre)
        const authorMatch = filters.author !== 'any' && book.author.includes(filters.author)
  
        if (titleMatch || authorMatch || genreMatch) {
            result.push(book)
        }
    }

    let page = 1
    /**
     * This if statement checks the result array and the result length is equal to 0 none 
     * of the books will be displayed and the "Show More" button will be disabled. Else if 
     * the result length is not equal to 0, the list of previews are created and displayed
     * on the page.
     */
    if (result.length === 0) {
        dataListItems.innerHTML = ''
        dataListButton.disabled = true 
        dataListMessage.classList.add('list__message_show')

        const remaining = result.length - page * BOOKS_PER_PAGE;
        dataListButton.innerHTML = /* HTML */ `
            <span>Show more</span>
            <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
        `;
    } else {
        dataListMessage.classList.remove('list__message_show')
        dataListItems.innerHTML = ''

        const searchStartIndex = (page - 1) * BOOKS_PER_PAGE
        const searchEndIndex = searchStartIndex + BOOKS_PER_PAGE

        const searchBookFragment = document.createDocumentFragment()
        const searchBookExtracted = result.slice(searchStartIndex, searchEndIndex)

        /**
        * This loop iterates over the book previews to display on the current page, 
        * creates a book preview button using the createPreview function, and 
        * appends the button to the bookFragment container
        */
        for (const preview of searchBookExtracted) {
            const showPreview = createPreview(preview)
            searchBookFragment.appendChild(showPreview)
        }
        
        dataListItems.appendChild(searchBookFragment)
        
        const remaining = result.length - page * BOOKS_PER_PAGE;
        dataListButton.innerHTML = /* HTML */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
        `;

        dataListButton.disabled = remaining <= 0;

        /**
         * This sets up a click event listener for the "Show More" button. When clicked, 
         * the code executes the logic to display the next set of book previews.
         */
        dataListButton.addEventListener('click', () => {
            page++;
        
            const moreSearchStartIndex = (page - 1) * BOOKS_PER_PAGE
            const moreSearchEndIndex = moreSearchStartIndex + BOOKS_PER_PAGE
        
            const moreSearchBookExtracted = result.slice(moreSearchStartIndex, moreSearchEndIndex)
        
            const moreSearchBookFragment = document.createDocumentFragment()
        
            for (const preview of moreSearchBookExtracted) {
                const showPreview = createPreview(preview)
                moreSearchBookFragment.appendChild(showPreview)
            }

            dataListItems.appendChild(moreSearchBookFragment);
        
            const remaining = result.length - page * BOOKS_PER_PAGE;
            dataListButton.innerHTML = /* HTML */ `
              <span>Show more</span>
              <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
            `;
        
            dataListButton.disabled = remaining <= 0;
        })
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    dataSearchOverlay.close()
    dataSearchForm.reset()
})


/** 
 * THEME SELECT
 * This code sets up event listeners and handles form submissions for a 
 * data settings overlay. When the header for the overlay is clicked, the 
 * overlay is shown. When the cancel button is clicked, the overlay is closed.
 * 
 */

dataHeaderSettings.addEventListener('click', () => {
    dataSettingsOverlay.showModal()
})

dataSettingsCancel.addEventListener('click', () => { 
    dataSettingsOverlay.close()
})

//The css object defines two themes, 'day' and 'night'
const css = {
    day : ['255, 255, 255', '10, 10, 20'],
    night: ['10, 10, 20', '255, 255, 255']
}

//The value of the dataSettingsTheme input is determined based on whether the user's preferred color scheme is dark or not.
dataSettingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
let v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

/**
 * This code sets up for a submit event listener. When the form is submitted, the selected 
 * object is created by converting the form data to an object using Object.fromEntries(). 
 * Depending on the theme selected, the --color-light and --color-dark CSS variables are 
 * updated with the corresponding light and dark color values from the css object
 */
dataSettingsForm.addEventListener('submit', handleFormSubmit);

export function handleFormSubmit(event) {
    event.preventDefault();
    const selected = getSelectedValues(event.target);

    if (selected.theme) {
        applyThemeStyles(selected.theme);
    }

    dataSettingsOverlay.close();
}

function getSelectedValues(form) {
    const formSubmit = new FormData(form);
    return Object.fromEntries(formSubmit);
}

function applyThemeStyles(theme) {
    if (css[theme] && css[theme].length >= 2) {
        document.documentElement.style.setProperty('--color-light', css[theme][0]);
        document.documentElement.style.setProperty('--color-dark', css[theme][1]);
    }
}