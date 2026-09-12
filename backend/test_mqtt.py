"""
Quick manual test: publishes one message and confirms a subscriber can receive it,
using the paho-mqtt library directly (no FastAPI involved yet).
Run: python test_mqtt.py
"""
import paho.mqtt.client as mqtt
import time

TOPIC = "tree/sensor-data"
received = []


def on_message(client, userdata, msg):
    received.append(msg.payload.decode())
    print(f"Received: {msg.payload.decode()}")


def on_connect(client, userdata, flags, reason_code, properties=None):
    print(f"Connected with result code {reason_code}")
    client.subscribe(TOPIC)


client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)
client.loop_start()

time.sleep(1)  # give it a moment to connect/subscribe
client.publish(TOPIC, "test message from python")
time.sleep(2)  # wait to receive it back

client.loop_stop()
client.disconnect()

if received:
    print("SUCCESS: message round-tripped through the broker.")
else:
    print("FAILED: no message received.")