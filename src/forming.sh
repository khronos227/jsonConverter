#!/usr/bin/sh

#直列化
while read LINE
do
   text=$text$LINE
done < $1

#空文字置換
text=`echo $text | sed -e "s/%/%25/g" | sed -e "s/ /%20/g"`
echo $text

