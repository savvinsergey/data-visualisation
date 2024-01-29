/// <reference lib="webworker" />
import {interval, map, Subscription} from "rxjs";
import {IData} from "./shared/interfaces/data.interface";
import { hex, rgb, name } from '@vid3v/random-color';

let subscription: Subscription;

addEventListener('message', ({ data: settings }) => {
  if (subscription) {
    subscription.unsubscribe()
  }

  subscription = interval(settings.timer)
    .pipe(map(() => generateData(settings.arraySize)))
    .subscribe(dataArr => postMessage(dataArr))
});

function generateData(arraySize: number): IData[] {
  let dataArr: IData[] = [];
  for (let i = 0; i <= arraySize - 1; i++) {
    dataArr = [...dataArr, {
      id: dataArr[dataArr.length - 1]?.id + 1 || 1,
      int: generateInt(1, 100),
      float: generateFloat(1, 100, 18),
      color: generateColor(),
      child: getChild(dataArr)
    }]
  }

  dataArr[0].child = getChild(dataArr);

  return dataArr;
}

function generateInt(min: number,
                     max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateFloat(min: number,
                        max: number,
                        decimals: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(
    decimals,
  ));
}

function generateColor() {
  const colorGeneratorsArray = [hex, rgb, name];
  return colorGeneratorsArray[generateInt(0,2)]();
}

function getChild(dataArr: IData[]) {
  const childIndex = generateInt(0, dataArr.length - 1);
  const defaultItem = { id: 0, color: generateColor() };
  const { id, color} = dataArr[childIndex] || defaultItem;

  return { id, color };
}

