import Rating from "../models/Rating";
export default class RatingsRepository{
  private model = Rating
  
  public async create(body: Rating): Promise<Rating> {
    const rating = await Rating.create(body)
    return await rating.save()
  }
}