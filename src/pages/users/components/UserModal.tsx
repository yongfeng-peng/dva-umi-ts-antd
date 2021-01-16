import React, { useEffect, FC } from 'react';
import { Modal, Form, Input, message, DatePicker, Switch } from 'antd';
import { SingleUserType, FormValues } from '../data';
import moment from 'moment';

interface UserModalProps {
  visible: boolean;
  record: SingleUserType | undefined;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const UserModal: FC<UserModalProps> = (props) => {
  const { visible, record, closeHandler, onFinish, confirmLoading } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    console.log('set');
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        ...record,
        create_time: moment(record.create_time),
        status: Boolean(record.status),
      });
    }
  }, [visible]);
  const onOk = () => {
    form.submit();
  };
  // 组件没有办法和仓库进行数据创素
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };

  const onFinishFailed = (errorInfo: any) => {
    // console.log(errorInfo);
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  return (
    <div>
      <Modal
        title={record ? 'Edit ID: ' + record.id : 'Add'}
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            status: true,
          }}
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="创建时间" name="create_time">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
