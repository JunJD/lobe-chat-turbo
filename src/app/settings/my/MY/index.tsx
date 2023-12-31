import { Form, type ItemGroup } from '@lobehub/ui';
import { Form as AntForm, Input, Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { debounce } from 'lodash-es';
import { BadgeJapaneseYen, UserCog } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/const/layoutTokens';
import AddTokenModal from '@/features/AddTokenModal';
import { useGlobalStore } from '@/store/global';
import { authSelectors } from '@/store/global/slices/auth/selectors';

type AuthGroup = ItemGroup;

const useStyles = createStyles(({ css, token }) => ({
  payIcon: css`
    cursor: pointer;
    color: ${token.colorInfo} !important;

    &:hover {
      color: ${token.colorSuccess} !important;
    }
  `,
}));

const MY = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation('setting');
  const [form] = AntForm.useForm();
  const [showStore, setShowStore] = useState(false);
  const authInfo = useGlobalStore(authSelectors.authInfo, isEqual);
  const [updateUserInfo] = useGlobalStore((s) => [s.updateUserInfo]);

  useEffect(() => {
    console.log('authInfo==>', authInfo);
  }, [authInfo]);

  const auth: AuthGroup = {
    children: [
      {
        children: <Input />,
        desc: t('settingMY.user.desc'),
        label: t('settingMY.user.title'),
        name: ['username'],
      },
      {
        children: (
          <Input
            disabled
            suffix={
              <Tooltip placement="topRight" title={t('settingMY.tokenBalance.pay.tooltip')}>
                <BadgeJapaneseYen
                  className={styles.payIcon}
                  onClick={() => {
                    setShowStore(true);
                  }}
                />
              </Tooltip>
            }
          />
        ),
        desc: t('settingMY.tokenBalance.desc'),
        label: t('settingMY.tokenBalance.title'),
        name: ['tokenBalance'],
      },
    ],
    icon: UserCog,
    title: t('settingMY.baseinfo'),
  };

  return (
    <>
      <Form
        form={form}
        initialValues={authInfo}
        items={[auth]}
        onValuesChange={debounce(updateUserInfo, 100)}
        {...FORM_STYLE}
      />
      <AddTokenModal open={showStore} setOpen={setShowStore} />
    </>
  );
});

export default MY;
