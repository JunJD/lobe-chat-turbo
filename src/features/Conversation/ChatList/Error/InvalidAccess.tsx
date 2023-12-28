import { Icon, RenderErrorMessage } from '@lobehub/ui';
import { Button, Input, Segmented } from 'antd';
import { createStyles } from 'antd-style';
import { AnimatePresence, motion } from 'framer-motion';
import { KeySquare, LogIn, SquareAsterisk } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { useGlobalStore } from '@/store/global';

import APIKeyForm from './ApiKeyForm';
import AuthForm from './AuthForm';
import { ErrorActionContainer, FormAction } from './style';

enum Tab {
  Api = 'api',
  Auth = 'auth',
  Password = 'password',
}

export const useStyles = createStyles(({ css }) => ({
  segmentedItem: css`
    display: flex;
    gap: 8px;
    justify-content: center;
  `,
}));

const InvalidAccess: RenderErrorMessage['Render'] = memo(({ id }) => {
  const { styles } = useStyles();
  const { t } = useTranslation('error');
  const [mode, setMode] = useState<Tab>(Tab.Auth);
  const [password, setSettings] = useGlobalStore((s) => [s.settings.password, s.setSettings]);
  const [resend, deleteMessage] = useChatStore((s) => [s.resendMessage, s.deleteMessage]);

  const options = useMemo(() => {
    return [
      {
        label: (
          <motion.div className={styles.segmentedItem} layoutId="segmentedItem">
            <Icon icon={LogIn} />
            {t('auth', { ns: 'common' })}
          </motion.div>
        ),
        value: Tab.Auth,
      },
      {
        label: (
          <motion.div className={styles.segmentedItem} layoutId="segmentedItem">
            <Icon icon={SquareAsterisk} />
            {t('password', { ns: 'common' })}
          </motion.div>
        ),
        value: Tab.Password,
      },
      {
        label: (
          <motion.div className={styles.segmentedItem} layoutId="segmentedItem">
            <Icon icon={KeySquare} />
            {'OpenAI Key'}
          </motion.div>
        ),
        value: Tab.Api,
      },
    ];
  }, []);

  return (
    <ErrorActionContainer>
      <Segmented
        block
        onChange={(value) => setMode(value as Tab)}
        options={options}
        style={{ width: '100%' }}
        value={mode}
      />
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 10 }}
          key={mode}
          transition={{ duration: 0.2 }}
        >
          {mode === Tab.Auth && <AuthForm id={id} />}
          {mode === Tab.Password && (
            <Center gap={16} style={{ maxWidth: 300 }}>
              <FormAction
                avatar={'🗳'}
                description={t('unlock.password.description')}
                title={t('unlock.password.title')}
              >
                <Input.Password
                  onChange={(e) => {
                    setSettings({ password: e.target.value });
                  }}
                  placeholder={t('unlock.password.placeholder')}
                  type={'block'}
                  value={password}
                />
              </FormAction>
              <Flexbox gap={12} width={'100%'}>
                <Button
                  onClick={() => {
                    resend(id);
                    deleteMessage(id);
                  }}
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
          )}
          {mode === Tab.Api && <APIKeyForm id={id} />}
        </motion.div>
      </AnimatePresence>
    </ErrorActionContainer>
  );
});

export default InvalidAccess;
