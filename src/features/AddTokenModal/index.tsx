import { Modal } from '@lobehub/ui';
import { Segmented } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useToolStore } from '@/store/tool';

interface PluginStoreProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}
const AddTokenModal = memo<PluginStoreProps>(({ setOpen, open }) => {
  const { t } = useTranslation('plugin');

  const [listType] = useToolStore((s) => [s.listType]);

  return (
    <Modal
      allowFullscreen
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      open={open}
      title={t('store.title')}
      width={800}
    >
      <Flexbox gap={16} width={'100%'}>
        <Segmented
          block
          onChange={(v) => {
            useToolStore.setState({ listType: v as any });
          }}
          options={[
            { label: t('store.tabs.all'), value: 'all' },
            { label: t('store.tabs.installed'), value: 'installed' },
          ]}
          style={{ flex: 1 }}
          value={listType}
        />
      </Flexbox>
    </Modal>
  );
});

export default AddTokenModal;
