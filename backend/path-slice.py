#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright (c) 2016 - Piotr Skonieczka
#

import Image
import pylab


def get_polygon(list_of_points):
    return [(list_of_points[idx], list_of_points[idx+1]) for idx in xrange(len(list_of_points)-1)]


def get_track(x1, y1, x2, y2):
    # Bresengham algorithm
    list_of_points = list()

    dx = abs(x1 - x2)
    dy = abs(y1 - y2)

    x_step = 1 if x1 < x2 else -1
    y_step = 1 if y1 < y2 else -1

    error = dx - dy

    while x1 != x2 and y1 != y2:
        list_of_points.append((x1, y1))

        doubled_error = 2 * error
        if doubled_error > -dy:
            error -= dy
            x1 += x_step

        if doubled_error < dx:
            error += dx
            y1 += y_step

    list_of_points.append((x2, y2))
    return list_of_points


def get_track_of_polygon(polygon):
    return [get_track(p1[0], p1[1], p2[0], p2[1]) for p1, p2 in polygon]


def get_image_cross_section(image, polygon):
    crossection_points = reduce(list.__add__, get_track_of_polygon(polygon))
    crossection_pixels = map(lambda point: image.getpixel(point), crossection_points)

    return crossection_pixels


def draw_the_track_cross_section(image, crossection_points):
    track_polygon = get_polygon(crossection_points)
    cross_section = get_image_cross_section(image, track_polygon)

    pylab.plot(map(lambda pixel: 255 - pixel[2], cross_section))
    pylab.ylim(0, 255)
    pylab.xlim(0, len(cross_section))
    pylab.xticks([])
    pylab.autoscale(False)
    pylab.show()


def main():
    demo_image = Image.open("temporary-image.jpg", "r")

    # Some points
    p1 = (62, 1022)
    p2 = (30, 890)
    p3 = (415, 555)
    p4 = (252, 918)

    track1 = [p1, p4]
    track2 = [p1, p2, p3, p4]

    draw_the_track_cross_section(demo_image, track1)
    draw_the_track_cross_section(demo_image, track2)


if __name__ == '__main__':
    main()

