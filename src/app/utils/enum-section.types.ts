export enum SectionType {
  image_matching = 1,
  third_option_multiple_choice = 2,
  conversation_matching_question = 3,
  reading_third_option_multiple_choice = 4,
  classic_multiple_selection = 5
}


export interface SectionInfo {
  type: number;
  title: string;
  description: string;
  style: string;
  route: string;
}

export function getSectionInfo(value: string | SectionType): SectionInfo {

  switch (value) {
    case SectionType.image_matching:
      return {
        type: 1,
        title: 'Matching',
        description: '<b> Match five sentences </b> to eight real-world notices.',
        style: 'type-1',
        route: '/section/image-relationship'
      };
    case SectionType.third_option_multiple_choice:
      return {
        type: 2,
        title: '3-option multiple choice',
        description: '<b> Read and Identify </b> appropiate vocabulary.',
        style: 'type-2',
        route: '/section/vocabulary-identification'
      };
    case SectionType.conversation_matching_question:
      return {
        type: 3,
        title: 'match conversation',
        description: '<b> Choose appropiate responses </b> in verbal exchanges and continuous dialogue.',
        style: 'type-3',
        route: '/section/conversation-relationship'
      };
    case SectionType.reading_third_option_multiple_choice:
      return {
        type: 4,
        title: '3-option main idea(s)',
        description: '<b> Read the text </b> for detailed understanding and main idea(s).',
        style: 'type-4',
        route: '/section/reading-comprehension'
      };
    case SectionType.classic_multiple_selection:
      return {
        type: 5,
        title: 'classic multiple selection',
        description: 'answer the questions with 4 multiple options',
        style: 'type-5',
        route: '/section/multiple-selection'
      };
    default:
      return null;
  }

}
