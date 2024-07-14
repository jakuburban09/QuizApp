import React, { FC, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Color, getColorClass } from '../../helpers/enums';
import AnswerIndicator from '../AnswerIndicator'
import Button from './Button';
import Text from './Text';

type NotificationProps = {
  heading: string;
  text: string | unknown;
  backgroundColor?: Color;
  type?: "indicator" | "button" | "success" | "error" | "warning" | "info" | undefined;
  showDetail?: boolean;
  onClose: () => void;
  onDetail: () => void;
};

const Notification: FC<NotificationProps> = ({ heading, text, backgroundColor, type, showDetail = false, onClose, onDetail }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 100000); // 10 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  let backgroundColorSwitch: Color;
  let backgoundIndicatorSwitch: Color;
  let typeOfAnswerIndication: "indicator" | "button" | "success" | "error" | "warning" | "info";

  switch (type) {
    case "success":
        backgroundColorSwitch = Color.Green200;
        backgoundIndicatorSwitch = Color.Green700
        typeOfAnswerIndication = "success";
        break;
    case "warning":
        backgroundColorSwitch = Color.Orange200;
        backgoundIndicatorSwitch = Color.Orange600
        typeOfAnswerIndication = "warning";
        break;
    case "error":
        backgroundColorSwitch = Color.Red200;
        backgoundIndicatorSwitch = Color.Red600
        typeOfAnswerIndication = "error";
        break;
    case "info":
        backgroundColorSwitch = Color.Blue200;
        backgoundIndicatorSwitch = Color.Blue600
        typeOfAnswerIndication = "info";
        break;
    default:
        backgroundColorSwitch = Color.Gray25;
        backgoundIndicatorSwitch = Color.Purple
        typeOfAnswerIndication = "button";
        break;
  }

  return (
    <div className={twMerge(`
      rounded border-2 border-purpleishWhiteOpacity shadow-basic duration-300
      ${getColorClass(backgroundColorSwitch)} text-white flex justify-between w-full rounded-xl
    `)}>
      <AnswerIndicator type={typeOfAnswerIndication} backgroundColor={backgoundIndicatorSwitch} isCorrect={false} />
      <div className="py-2 text-left w-full px-4">
        <Text style='buttonMediumBold'>{heading}</Text>
        <Text style='buttonSmall'>{text}</Text>
      </div>
      {showDetail && <button onClick={onDetail} className="mr-2 text-sm underline">Detail</button>}
      <div className='m-2 flex items-center'>
        <Button onClickButton={onClose} color={Color.Gray25} icon={{iconName:"XLg", color: "black", width: 28, height: 28}} rounded> </Button>
      </div>
    </div>
  );
};

export default Notification;
