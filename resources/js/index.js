function getRssFeed(magazines) {

    const accordionSection = document.getElementById('accordionSection');
  
      magazines.forEach((item, i) => {
          async function getFeeds() {
              try{
                  const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${item}`);
                  if (response.status === 200) {
                      const data = await response.json();
                      let id = ID();
  
                      const {feed, items} = data;
  
                      let accordion = renderAccordionSection(i, id, feed.title);
                      accordionSection.innerHTML += accordion;
                      
                      renderCarouselItems(id, items);
                  } else {
                      throw error;
                  }
              } catch (err) {
                  console.log(err);
              }
          }
          getFeeds();
      });
  }
  
  // random ID generator
  let ID = () => Math.random().toString(36).substr(2, 9);
  
  // To render accordion items into DOM
  const renderAccordionSection = (index, id, title) => {
    let divAccordion = `<div class="accordion-item">
                          <button class="accordion-button ${index === 0 ? "" : "collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">
                            ${title}
                          </button>
                          <div id="collapse-${id}" class="accordion-collapse collapse ${index === 0 ? "show": ""}" aria-labelledby="heading-${id}" data-bs-parent="#accordionSection">
                            <div class="accordion-body">
                              <div id="indicator-${id}" class="carousel slide " data-bs-ride="carousel"> 
                                <div class="carousel-inner" id="carousel-inner-${id}">
                                </div>
                                <div>
                                <a class="carousel-control-prev" href="#indicator-${id}" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                              </a>
                                </div>
                                <div>
                                <a class="carousel-control-next" href="#indicator-${id}" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                              </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`;
    return divAccordion;
  }
  
  // TO render Carousel Item within accordion body
  const renderCarouselItems = (id, items) => {
    const carouselInnerId = document.querySelector(`#carousel-inner-${id}`);
  
    items.forEach((el, j) => {
      let carouselTemplate = carouselItemTemplate(el, j);
      carouselInnerId.innerHTML += carouselTemplate;
    })
  
    console.log(carouselInnerId);
  }
  
  // To render each carousel item card to DOM
  const carouselItemTemplate = (el, j) => {
    let cardTemplate = `<div class="carousel-item ${j === 0 ? "active" : ""}">
                          <div class="card d-block">
                              <img class="w-100 img img-responsive" src=${el.enclosure.link} alt="${el.guid}">
                              <div class="card-body">
                                  <h5 class="card-title">${el.title}</h5>
                                  <p class="card-author">${el.author} <span class="ellipse"></span> ${new Date(el.pubDate).toLocaleDateString()}</p>
                                  <p class="card-text">${el.description.slice(0,100)}...
                                  <a href="${el.link}" class="card-link " target="_blank">View Details</a>
                                  </p>
                              </div>
                          </div>
                        </div>
                        `;
    return cardTemplate;
  }
  
  export {getRssFeed};