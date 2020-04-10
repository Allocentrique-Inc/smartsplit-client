import React from "react"
import { Svg, Path, Rect, Circle, Defs, Pattern, Use, Image } from "react-native-svg"

export default function HighFive(props) {
    return <Svg 
            width="144" 
            height="144" 
            viewBox="0 0 144 144" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns="http://www.w3.org/1999/xlink">
    <Rect x="22" y="26" width="96" height="96" rx="48" fill="#F5F2F3"/>
    <Rect x="26" y="22" width="96" height="96" rx="48" stroke="#DCDFE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M137 49V55" stroke="#DCDFE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M140 52H134" stroke="#DCDFE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M11 104V110" stroke="#DCDFE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M14 107H8" stroke="#DCDFE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M13 2V12" stroke="#DCDFE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M13 22V32" stroke="#DCDFE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M8 17H2" stroke="#DCDFE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M24 17H18" stroke="#DCDFE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Circle cx="13" cy="17" r="1" fill="#DCDFE1"/>
    <Rect width="56" height="56" transform="matrix(-1 0 0 1 100 44)" fill="url(#pattern0)"/>
    <Defs>
    <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <Use href="#image0" transform="scale(0.00195312)"/>
    </Pattern>
    </Defs>
</Svg>
}
