import { union, intersect } from 'valibot';
import { BASE, CATEGORIZE, DRAG, DROPDOWN, MULTIPLE } from './questions';

export const QUESTIONS = intersect([BASE, union([MULTIPLE, CATEGORIZE, DROPDOWN, DRAG])]);
