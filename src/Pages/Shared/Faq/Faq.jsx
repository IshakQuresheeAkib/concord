import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';

import Heading from '../../../Components/Heading/Heading'


    const text1 = `
    Creating a profile is easy! Simply click on the "Sign Up" button, fill in your details, upload a photo, and you're ready to start your journey to find a life partner.
        `;

    const text2 = `
    Absolutely! Our platform allows you to set preferences for age, height, occupation, and more. This ensures that you connect with individuals who match your criteria and share similar life goals.
        `;

    const text3 = `
    Yes, we prioritize the security and privacy of your information. Our platform employs advanced encryption and security measures to safeguard your data, providing you with a safe and secure environment as you search for your life partner.
        `;
    const getItems = (panelStyle) => [
      {
        key: '1',
        label: 'How do I create a profile on the Matrimony platform?',
        children: <p className='text-md'>{text1}</p>,
        style: panelStyle,
      },
      {
        key: '2',
        label: 'Can I specify preferences for my potential life partner?',
        children: <p className='text-md'>{text2}</p>,
        style: panelStyle,
      },
      {
        key: '3',
        label: 'Is my information secure on this Matrimony website?',
        children: <p className='text-md'>{text3}</p>,
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
        <div className='flex flex-col justify-center items-center gap-10 px-10 mt-20 max-w-7xl mx-auto'>
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