import {
  object,
  union,
  intersect,
  string,
  number,
  picklist,
  type InferInput,
  array,
  literal
} from 'valibot'
import { QUESTIONS } from './questions'

export type Table<O, T extends keyof O> = {
  // @ts-expect-error just because
  [K in O[T]]: Extract<O, { [key in T]: K }>
}

export type Resource = InferInput<typeof RESOURCE>
export type Glossary = Extract<Resource, { kind: 'glossary' }>
export type Quiz = Extract<Resource, { kind: 'quiz' }>
export type Question = Quiz['questions'][number]
export type QuestionsRecord = Table<Question, 'type'>

export const RESOURCE = intersect([
  object({
    id: string(),
    title: string(),
    author: string(),
    created: number(),
    updated: number(),
    storage: picklist(['localfirst', 'localonly', 'serverfirst', 'serveronly'])
  }),
  union([
    object({
      kind: literal('glossary'),
      terms: array(
        object({
          text: string(),
          media: string(),
          categories: array(string()),
          definition: object({
            text: string(),
            media: string()
          })
        })
      )
    }),

    object({
      kind: literal('quiz'),
      questions: array(QUESTIONS)
    })
  ])
])

export function createExampleGlossaryTerms(): Glossary['terms'] {
  function term(t: string, d: string, c = '') {
    return {
      categories: c.length ? [c] : [],
      definition: {
        text: d,
        media: ''
      },
      media: '',
      text: t
    }
  }

  return [
    term(
      'circuit',
      'the complete path of an electric current, including the source of electrical energy',
      'Electrical Engineering'
    ),
    term(
      'conductor',
      'a substance that allows electricity to flow through it (ex. metal)',
      'Electrical Engineering'
    ),
    term(
      'electrical energy',
      'a form of energy that results from the movement of charged particles',
      'Electrical Engineering'
    ),
    term('current', 'the flow of charged particles', 'Electrical Engineering'),
    term(
      'insulator',
      'a substance that does not allow electricity to flow through it (ex. plastic or rubber)',
      'Electrical Engineering'
    ),
    term(
      'switch',
      'a part of a circuit that controls when the circuit is complete (closed) or incomplete (open)',
      'Electrical Engineering'
    ),
    term(
      'open circuit',
      'an electrical circuit that is not complete',
      'Electrical Engineering'
    ),
    term(
      'closed circuit',
      'an electrical circuit that is complete and electricity can flow through',
      'Electrical Engineering'
    ),
    term(
      'light energy',
      'the kind of energy that moves in waves and can be seen',
      'Electrical Engineering'
    )
  ]
}
