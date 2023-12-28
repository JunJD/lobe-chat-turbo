import { Icon } from '@lobehub/ui';
import { Button, Form, Input } from 'antd';
import { LockKeyhole } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { useGlobalStore } from '@/store/global';
import { settingsSelectors } from '@/store/global/selectors';

import { FormAction } from './style';

const APIKeyForm = memo<{ id: string }>(({ id }) => {
  const { t } = useTranslation('error');
  const [showProxy, setShow] = useState(false);

  const [apiKey, proxyUrl, setConfig] = useGlobalStore((s) => [
    settingsSelectors.openAIAPI(s),
    settingsSelectors.openAIProxyUrl(s),
    s.setOpenAIConfig,
  ]);

  const [resend, deleteMessage] = useChatStore((s) => [s.resendMessage, s.deleteMessage]);

  const validateMessages = {
    types: {
      email: '请填写你的邮箱账号',
    },
  };

  return (
    <Center gap={16} style={{ maxWidth: 300 }}>
      <FormAction
        avatar={'💻'}
        description={t('unlock.auth.description')}
        title={t('unlock.auth.title')}
      >
        <Form name="nest-messages" style={{ width: '100%' }} validateMessages={validateMessages}>
          <Form.Item name={['user', 'email']} rules={[{ type: 'email' }]}>
            <Input
              onChange={(e) => {
                setConfig({ OPENAI_API_KEY: e.target.value });
              }}
              placeholder={`填写邮箱，使用${showProxy ? '密码' : '验证码'}注册/登陆`}
              type="email"
              value={apiKey}
            />
          </Form.Item>
        </Form>
        {showProxy ? (
          <Input.Password
            onChange={(e) => {
              setConfig({ endpoint: e.target.value });
            }}
            placeholder={'请填写你的密码'}
            type={'block'}
            value={proxyUrl}
          />
        ) : (
          <Button
            icon={<Icon icon={LockKeyhole} />}
            onClick={() => {
              setShow(true);
            }}
            type={'text'}
          >
            {t('unlock.auth.login')}
          </Button>
        )}
      </FormAction>
      <Flexbox gap={12} width={'100%'}>
        <Button
          block
          onClick={() => {
            resend(id);
            deleteMessage(id);
          }}
          style={{ marginTop: 8 }}
          type={'primary'}
        >
          {t('unlock.confirm')}
        </Button>
        <Button
          onClick={() => {
            deleteMessage(id);
          }}
        >
          {t('unlock.closeMessage')}
        </Button>
      </Flexbox>
    </Center>
  );
});

export default APIKeyForm;
