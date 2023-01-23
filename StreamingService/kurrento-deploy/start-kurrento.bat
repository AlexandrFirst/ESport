docker run --rm ^
    -p 8888:8888/tcp ^
    -p 5000-5050:5000-5050/udp ^
    -e KMS_MIN_PORT=5000 ^
    -e KMS_MAX_PORT=5050 ^
    -e KMS_ICE_TCP=1 ^
    -e KMS_TURN_URL=e76b1e18382eb8485e4ced0f:awmeGuNs0IsK0VkM@216.39.253.11:80^
    -e GST_DEBUG="${GST_DEBUG:-2},KurentoUriEndpointImpl:5,uriendpoint:5,playerendpoint:5,kmselement:5,appsrc:4,agnosticbin*:5,uridecodebin:6,rtspsrc:6,souphttpsrc:5,GST_URI:6,*CAPS*:3"^
    -v //d/nure/Diplom/ESport/StreamingService/kurrento-deploy/records:/tmp^
    kurento/kurento-media-server:6.18.0