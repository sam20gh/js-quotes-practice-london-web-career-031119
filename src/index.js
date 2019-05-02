// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

const baseUrl = "http://localhost:3000/quotes"
const quoteEl = document.querySelector("#quote-list")
const formEl = document.querySelector("#new-quote-form")
const formQuote = document.querySelector("#new-quote")
const formAutor = document.querySelector("#author")

const state = {
    quotes: [],
    selectedQuote: null
}


//render single quote
const renderQuote = quote => {
    const quoteDiv = document.createElement('li')
    quoteDiv.className = 'quote-card'
    quoteDiv.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes:<span>${quote.likes}</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
    `
    

    const likeBtn = quoteDiv.querySelector(".btn-success")
    const deleteBtn = quoteDiv.querySelector(".btn-danger")

    likeBtn.addEventListener("click", () => {
        quote.likes++
        updateQuote(quote)
        likeBtn.innerHTML = `Likes:<span>${quote.likes}</span>`

    })

    deleteBtn.addEventListener('click', () => {
        deleteQuote(quote)
        quoteDiv.remove()
    })

    quoteEl.append(quoteDiv)


}

//render all quotes
const renderQuotes = quotes => {
    quotes.forEach(renderQuote)

}

// create a new Quote using the form
const addNewQuote = () => {
    formEl.addEventListener("submit", event => {
        event.preventDefault()

    const quote = {
        quote: formQuote.value,
        author: formAutor.value,
        likes: 0
    }
    createQuote(quote)
    renderQuote(quote)
        formEl.reset()
    })

}

//Create quote API
const createQuote = quote => {
    fetch(baseUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(quote)
    }).then(resp => resp.json())
}



//Increase like API
const updateQuote = quote => {
    fetch(baseUrl + `/${quote.id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({likes: quote.likes})
    }).then(resp => resp.json())
}

// delete likes 
const deleteQuote = quote => {
    fetch(baseUrl + `/${quote.id}`, {
        method: "DELETE"
    }).then(resp => resp.json())
}





// fetch Quotes
const fetchQuotes = () =>
    fetch(baseUrl)
    .then(resp => resp.json())




//initialize 
const init = () => {
    fetchQuotes()
    .then(renderQuotes)
    addNewQuote()
}

init()






