const clientId = 'luKfditnFxjs-XJpjNwCWQ';
const secret = '8k7O9lJ0pfliwCvPoo9SGQscHbsEqwTYysnq6fKpfu9cdEn1FSVLGSXDlosraz45';

let accessToken = '';

let Yelp = {

  getAccessToken()
  {
    if(this.acessToken)
    {
      return new Promise(resolve => resolve(this.acessToken));
    }

    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {method: 'POST'}).then(response => {
  return response.json();
}).then(jsonResponse => {

  this.access_token = jsonResponse.access_token;
});

  },


  search(term, location, sortBy) {

    return Yelp.getAccessToken().then(() => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers:
        {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
  }
).then(response => {
  return response.json();
}).then(jsonResponse => {
  if(jsonResponse.businesses) {

    return jsonResponse.businesses.map(business => {
     {
        id: business.id,
        imageSrc: business.imageSrc,
        name: business.name,
        address: business.address,
        city: business.city,
        state: business.state,
        zipCode: business.zipCode,
        category: business.category,
        rating: business.rating,
        reviewCount: business.reviewCount
      });
    }
  });




}

export { Yelp } ;
