import { Icon } from '@lobehub/ui';
import { Button, Form, Input } from 'antd';
import { LockKeyhole } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { useGlobalStore } from '@/store/global';
import { authSelectors } from '@/store/global/slices/auth/selectors';

import { FormAction } from './style';

const APIKeyForm = memo<{ id: string }>(({ id }) => {
  const { t } = useTranslation('error');
  const [isDtupwd, setShow] = useState(false);

  const [loginParams, setLoginParams] = useGlobalStore((s) => [
    authSelectors.loginParams(s),
    authSelectors.setLoginParams(s),
  ]);
  const [authInfo, processLogin] = useGlobalStore((s) => [
    authSelectors.authInfo(s),
    authSelectors.processLogin(s),
  ]);

  useEffect(() => {
    console.log(authInfo, 'authInfo');
  }, [authInfo]);

  const [deleteMessage, resendMessage] = useChatStore((s) => [s.deleteMessage, s.resendMessage]);

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
          <Form.Item name={['user', 'email']} rules={[{ type: 'email' }]} style={{ margin: 0 }}>
            <Input
              onChange={(e) => {
                setLoginParams({ email: e.target.value, password: '' });
              }}
              placeholder={`填写邮箱，使用${isDtupwd ? '密码' : '验证码'}注册/登陆`}
              type={'email'}
              value={loginParams.email}
            />
          </Form.Item>
        </Form>
        {isDtupwd ? (
          <Input.Password
            onChange={(e) => {
              setLoginParams({ ...loginParams, password: e.target.value });
            }}
            placeholder={'请填写你的密码'}
            type={'block'}
            value={loginParams.password}
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
          onClick={async () => {
            await processLogin();
            resendMessage(id);
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
