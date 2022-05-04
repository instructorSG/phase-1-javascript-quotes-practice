const baseURL = 'http://localhost:3000';

const quotesList = document.getElementById ('quote-list');
const newQuoteForm = document.getElementById ('new-quote-form');

fetch (`${baseURL}/quotes?_embed=likes`)
  .then (res => res.json ())
  .then (quotes => {
    quotes.forEach (quote => renderQuoteItem (quote));
  });

const postQuoteItem = q => {
  fetch ('http://localhost:3000/quotes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify ({
      quote: q.quote,
      author: q.author,
    }),
  })
    .then (response => {
      return response.json ();
    })
    .then (data => {
      console.log (data);
    });
};

const renderQuoteItem = el => {
  let li = document.createElement ('li');
  li.class = 'quote-card';
  let blockQuote = document.createElement ('blockquote');
  li.appendChild (blockQuote);

  let quote = document.createElement ('p');
  quote.class = 'mb-0';
  quote.innerHTML = el.quote;
  blockQuote.appendChild (quote);

  let footer = document.createElement ('footer');
  footer.class = 'blockquote-footer';
  footer.innerHTML = el.author;
  blockQuote.appendChild (footer);

  let br = document.createElement ('br');
  blockQuote.appendChild (br);

  let likeBtn = document.createElement ('button');
  likeBtn.class = 'btn-success';
  likeBtn.innerHTML = 'Likes: ';

  let deleteBtn = document.createElement ('button');
  deleteBtn.class = 'btn-danger';
  deleteBtn.innerHTML = 'Delete';

  let span = document.createElement ('span');
  span.innerHTML = 0;
  likeBtn.appendChild (span);

  blockQuote.appendChild (likeBtn);
  blockQuote.appendChild (deleteBtn);

  quotesList.append (li);
};

newQuoteForm.addEventListener ('submit', e => handleFormSubmit (e));

const handleFormSubmit = e => {
  e.preventDefault ();
  const quoteObject = {
    quote: e.target.quote.value,
    author: e.target.author.value,
  };
  // TODO
  postQuoteItem (quoteObject);

  renderQuoteItem (quoteObject);
};
