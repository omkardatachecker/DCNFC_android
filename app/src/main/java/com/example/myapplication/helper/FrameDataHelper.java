package com.example.myapplication.helper;


import android.media.Image;
import android.view.Choreographer;

import androidx.camera.core.ImageProxy;
import androidx.camera.core.impl.ImageOutputConfig;

import java.nio.ByteBuffer;

public class FrameDataHelper {

//    public static Choreographer.FrameData createFrameDataFromByteBuffer(ByteBuffer byteBuffer, int width, int height) {
//        ImageOutputConfig imageOutputConfig = new ImageOutputConfig.Builder().build();
//        ImageProxy.Builder builder = imageOutputConfig.getImageInfoFactory().newBuilder();
//
//        ImageProxy.PlaneProxy[] planeProxies = new ImageProxy.PlaneProxy[1];
//        Image.Plane[] planes = new Image.Plane[1];
//        ImageProxy.PlaneProxy planeProxy = builder.getPlanesProxyFactory().newInstance(
//                ImageProxy.PlaneProxy.PlaneType.Y,
//                byteBuffer,
//                width,
//                height,
//                byteBuffer.remaining()
//        );
//
//        planeProxies[0] = planeProxy;
//
//        ImageProxy.PlaneProxy[] planesCopy = planeProxies.clone();
//        planes[0] = new Image.Plane(planeProxies[0], null);
//
//        return new FrameData.Builder()
//                .setFormat(ImageProxy.PlaneProxy.PlaneType.Y)
//                .setPlanes(planes)
//                .setPixelStride(planeProxy.getPixelStride())
//                .setRowStride(planeProxy.getRowStride())
//                .setSize(width, height)
//                .build();
//    }
}
