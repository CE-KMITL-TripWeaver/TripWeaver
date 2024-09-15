import { divIcon } from "leaflet";
import { ReactElement } from "react";
import { renderToString } from "react-dom/server";

export const createLeafletIcon = (
  icon: ReactElement,
  size: number,
  className?: string,
  width: number = size,
  height: number = size,
  center: boolean = false
) => {
  const widthAnchor = width / 2;
  const heightAnchor = center ? height / 2 : height;
  return divIcon({
    html: renderToString(icon),
    iconSize: [width, height],
    iconAnchor: [widthAnchor, heightAnchor],
    popupAnchor: [0, -heightAnchor],
    className: className ? className : "",
  });
};