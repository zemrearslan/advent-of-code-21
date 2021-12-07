file = open("/input", "r")
data = file.read().splitlines()
parsed_data = [int(i) for i in data]
count = 0
for index, value in enumerate(parsed_data):
    if index + 1 < len(parsed_data) and parsed_data[index + 1] > parsed_data[index]:
        count += 1
print(count)
