import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ModelStatic } from 'sequelize';
import User from '../../database/models/UserModel';
import InvalidFieldsError from '../errors/InvalidFieldsError';
import TokenError from '../errors/TokenError';
import IServiceLogin from '../interfaces/IServiceLogin';
import IUser from '../interfaces/IUser';
import ValidateLoginField from './validations/ValidationsInputValues';

export default class LoginService implements IServiceLogin {
  protected model: ModelStatic<User> = User;

  private secret: string = process.env.JWT_SECRET || 'jwt_secret';

  async validate(dto: IUser): Promise<string> {
    const { email, password } = dto;

    ValidateLoginField.email(dto.email);
    ValidateLoginField.password(dto.password);

    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      throw new InvalidFieldsError('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new InvalidFieldsError('Invalid email or password');
    }

    const token = jwt.sign({ data: { email } }, this.secret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });

    return token;
  }

  async getRole(email: string): Promise<string> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      throw new TokenError('Token must be a valid token');
    }
    return user.role;
  }
}
