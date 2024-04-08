import { ModelProviderCard } from '@/types/llm';

// refs to: https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
const OpenAI: ModelProviderCard = {
  chatModels: [
    {
      description: 'GPT 3.5 Turbo，适用于各种文本生成和理解任务',
      displayName: 'GPT-3.5 Turbo',
      functionCall: true,
      id: 'gpt-3.5-turbo',
      tokens: 16_385,
    },
    {
      displayName: 'GPT-3.5 Turbo (0125)',
      functionCall: true,
      hidden: true,
      id: 'gpt-3.5-turbo-0125',
      tokens: 16_385,
    },
    {
      displayName: 'GPT-3.5 Turbo (1106)',
      functionCall: true,
      hidden: true,
      id: 'gpt-3.5-turbo-1106',
      tokens: 16_385,
    },
    {
      displayName: 'GPT-3.5 Turbo Instruct',
      hidden: true,
      id: 'gpt-3.5-turbo-instruct',
      tokens: 4096,
    },
    {
      displayName: 'GPT-3.5 Turbo 16K',
      hidden: true,
      id: 'gpt-3.5-turbo-16k',
      tokens: 16_385,
    },
    {
      displayName: 'GPT-3.5 Turbo (0613)',
      hidden: true,
      id: 'gpt-3.5-turbo-0613',
      legacy: true,
      tokens: 4096,
    },
    {
      displayName: 'GPT-3.5 Turbo 16K (0613)',
      hidden: true,
      id: 'gpt-3.5-turbo-16k-0613',
      legacy: true,
      tokens: 4096,
    },
  ],
  enabled: true,
  id: 'openai',
};

export default OpenAI;
