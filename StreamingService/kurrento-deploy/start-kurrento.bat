docker run --rm ^
    -p 8888:8888/tcp ^
    -p 5000-5050:5000-5050/udp ^
    -e KMS_MIN_PORT=5000 ^
    -e KMS_MAX_PORT=5050 ^
    -e KMS_ICE_TCP=1 ^
    -e KMS_TURN_URL=e76b1e18382eb8485e4ced0f:awmeGuNs0IsK0VkM@216.39.253.11:80^
    kurento/kurento-media-server:6.18.0