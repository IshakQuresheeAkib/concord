import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';

import Heading from '../../../Components/Heading/Heading'


    const text = `
        A dog is a type of domesticated animal.
        Known for its loyalty and faithfulness,
        it can be found as a welcome guest in many households across the world.
        `;
    const getItems = (panelStyle) => [
      {
        key: '1',
        label: 'This is panel header 1',
        children: <p>{text}</p>,
        style: panelStyle,
      },
      {
        key: '2',
        label: 'This is panel header 2',
        children: <p>{text}</p>,
        style: panelStyle,
      },
      {
        key: '3',
        label: 'This is panel header 3',
        children: <p>{text}</p>,
        style: panelStyle,
      },
    ];
    const Faq = () => {

        const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

    return (
        <div className='flex flex-col justify-center items-center gap-10 px-10 pb-36 pt-28'>
            <div className='lg:w-1/2 mx-auto'>
                <img src="https://i.ibb.co/w7jTgcP/7879-1.jpg" alt="" className="lg:h-72 mx-auto mb-10"/>
                <Heading>Frequently Asked Questions</Heading>
                <p className='my-4 text-center'>Here are answers to some common questions that might help you better understand how we work and how you can get involved.</p>
            </div>
            <Collapse
      bordered={false}
      defaultActiveKey={['2']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{
        background: token.colorBgContainer,
      }}
      items={getItems(panelStyle)}
    />
             
        </div>
    )}
export default Faq;