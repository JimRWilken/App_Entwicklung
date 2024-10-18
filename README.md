App Entwicklung IOS


scrollviews und Allgeime Fenster dürfen keine Safeareaview haben, sondern sollten eine View haben und darin die scrollview. die scrollview definiert dann den Abstand nach oben, damit die Notch nicht getroffen wird. bspl: (mt-10 perfekt für Notch)

   <View className="bg-secondary border border-red-500 flex-1">
      <ScrollView className=" flex-1 px-4 mt-10 border border-blue-700">
        <Text className="text-xl text-black-100 font-psemibold">
          Erstelle Sie ein Rezept, dass andere sehen können
        </Text>