const clientId = 'luKfditnFxjs-XJpjNwCWQ';
const secret = '8k7O9lJ0pfliwCvPoo9SGQscHbsEqwTYysnq6fKpfu9cdEn1FSVLGSXDlosraz45';

let accessToken = '';

export const Yelp = {

  getAccessToken()
  {
    if(acessToken)
    {
      return new Promise(resolve => resolve(acessToken));
    }

    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {method: 'POST'}).then(response => {
  return response.json();
}).then(cback => cback(jsonResponse){
  access_token = jsonResponse.access_token;
});

  },


  search(term, location, sortBy)
  {

    return yelp.getAccessToken().then(responso => responso()
  {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {
  return response.json();
}).then(cback => cback(jsonResponse){
  if(jsonResponse.businesses){

    return jsonResponse.businesses.map(business => (
      return {
        id: business.id,
        imageSrc: business.imageSrc,
        name: business.name,
        address: business.address,
        city: business.city,
        state: business.state,
        zipCode: business.zipCode,
        category: businesses.category,
        rating: business.rating,
        reviewCount: business.reviewCount
      }
    ));

  }
});

};


export default Yelp;
