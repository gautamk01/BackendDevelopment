class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1) Filtering
    const querycollection = { ...this.queryString };
    console.log(this.queryString);
    const excludefield = ['page', 'sort', 'limit', 'fields']; //we are doing this because we can't add this in the query
    excludefield.forEach((el) => delete querycollection[el]);

    //2) Advanced Filtering
    let queryStr = JSON.stringify(querycollection);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' '); //req.query.sort =>takes only the sort section
      //then If we have more than one criteria for sorting the we split the , then join by whitespace
      this.query = this.query.sort(sortBy); //Then add that to the sorting section
      //sort is a function used by the models
    } else {
      this.query = this.query.sort('-createdAt ratingsQuantity');
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pageing() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIfeatures;
