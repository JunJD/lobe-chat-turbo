import { Button, Form, Input, Modal } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';

interface PluginStoreProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}

// const createTemp = [
//     2000,
// ]

const AddTokenModal = memo<PluginStoreProps>(({ setOpen, open }) => {
  const { t } = useTranslation('pay');
  const [createPrePay] = useGlobalStore((s) => [s.createPrePay]);
  // const [current, setCurrent] = useState(0);

  // const next = () => {
  //     setCurrent(current + 1);
  // };

  // const prev = () => {
  //     setCurrent(current - 1);
  // };

  const onFinish = ({ totalAmount }: { totalAmount: number }) => {
    createPrePay(+totalAmount);
  };

  return (
    <Modal
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      open={open}
      title={t('precreate.title')}
      width={800}
    >
      <p>{t('precreate.desc')}</p>
      <Form initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item label="充值金额：" name="totalAmount">
          <Input></Input>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AddTokenModal;
