const clientId = 'luKfditnFxjs-XJpjNwCWQ';
const secret = '8k7O9lJ0pfliwCvPoo9SGQscHbsEqwTYysnq6fKpfu9cdEn1FSVLGSXDlosraz45';

let acessToken;

let Yelp = {

  getAccessToken()
  {
    if(acessToken)
    {
      return new Promise(resolve => resolve(acessToken));
    }

    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {method: 'POST'}).then(response => {
  return response.json();
}).then(jsonResponse => {

  access_token = jsonResponse.access_token;
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
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });




}

}

export { Yelp } ;
