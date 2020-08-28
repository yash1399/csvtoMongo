const mongoose = require('mongoose');
const csvtojson = require('csvtojson'); 

const getMovieJson = async () => {
    const csvPath = __dirname + '/movies.csv'
    const jsonArray = await csvtojson().fromFile(csvPath); 
    return jsonArray
  
  }

  (async () => {

    const movies = await getMovieJson();

      await mongoose.connect('mongodb://localhost:27017/moviescsv'); 
      console.log('The connection is done '); 

      const MoviesSchema = new mongoose.Schema({ 
          name:'string', 
          rating : 'number',
          description: 'string'
      });
      
      const Movies = mongoose.model('Movies', MoviesSchema);

      movies.map( async element => {
        await Movies.create({
            name: element.name, 
            rating: element.rating, 
            description: element.description
        })
      })
      console.log(await Movies.find())
      console.log("created new User")
  })();
