import { Form, type ItemGroup } from '@lobehub/ui';
import { Form as AntForm, Input } from 'antd';
import isEqual from 'fast-deep-equal';
import { debounce } from 'lodash-es';
import { UserCog } from 'lucide-react';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/const/layoutTokens';
import { useGlobalStore } from '@/store/global';
import { authSelectors } from '@/store/global/slices/auth/selectors';

type AuthGroup = ItemGroup;

const MY = memo(() => {
  const { t } = useTranslation('setting');
  const [form] = AntForm.useForm();
  const authInfo = useGlobalStore(authSelectors.authInfo, isEqual);
  const [updateUserInfo] = useGlobalStore((s) => [s.updateUserInfo]);

  useEffect(() => {
    console.log('authInfo==>', authInfo);
  }, [authInfo]);

  const auth: AuthGroup = {
    children: [
      {
        children: <Input />,
        desc: t('settingMY.email.desc'),
        label: t('settingMY.email.title'),
        name: ['username'],
      },
    ],
    icon: UserCog,
    title: t('settingMY.baseinfo'),
  };

  return (
    <Form
      form={form}
      initialValues={authInfo}
      items={[auth]}
      onValuesChange={debounce(updateUserInfo, 100)}
      {...FORM_STYLE}
    />
  );
});

export default MY;
