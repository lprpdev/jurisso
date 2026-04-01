import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PLANS_KEY } from '../decorators/plans.decorator';

const PLAN_HIERARCHY: Record<string, number> = {
  free: 0,
  pro: 1,
  enterprise: 2,
};

@Injectable()
export class PlansGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPlans = this.reflector.getAllAndOverride<string[]>(PLANS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPlans || requiredPlans.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.plan) {
      throw new ForbiddenException('Plan information not available');
    }

    const userLevel = PLAN_HIERARCHY[user.plan] ?? 0;
    const minRequired = Math.min(
      ...requiredPlans.map((p) => PLAN_HIERARCHY[p] ?? 0),
    );

    if (userLevel < minRequired) {
      throw new ForbiddenException(
        'Your current plan does not include this feature. Please upgrade.',
      );
    }

    return true;
  }
}
