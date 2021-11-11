import NotFoundException from "../exceptions/NotFoundException";
import Speaker from "../models/Speaker";
import { Workshop } from "../models/Workshop";
export default class WorkshopRepository{
  private model = Workshop

  static getInstance(): WorkshopRepository {
    return new WorkshopRepository();
  }

  async createWithSpeaker(workshop: Workshop): Promise<Workshop> {
    let createdWorkshop = await this.model.create(workshop, { include: [Speaker] });
    await createdWorkshop.save()

    return createdWorkshop;
  }

  async create(workshop: Workshop): Promise<Workshop> {
    let createdWorkshop = await this.model.create(workshop);
    await createdWorkshop.save()

    return createdWorkshop;
  }

  async findById(id: number): Promise<Workshop> {
    let workshop = await this.model.findByPk(id);
    if(!workshop) {
      throw new NotFoundException("Workshop not found");
    }
    return workshop;
  }

  public async getWorkshopWithRatings(): Promise<any>{
    const ratings = await this.model.sequelize?.query(`
      select ws.id, ws.title, sp.name, sp.email, avg(rt.rating) rating
      from workshops ws
      inner join ratings rt on rt.workshop_id = ws.id
      inner join speakers sp on ws.speaker_id = sp.id 
      group by ws.id, sp.name, sp.email
    `) as any

    return ratings[0] as any[]
  }
}