General
=======

  * Each Visual Studio solution contains a full example; there are no dependencies between them.

  * All the solutions are ready to be executed directly after building them - just press F5 and enjoy.

  * However, some projects include specific setup instructions in their start page or in a README.txt file.

Troubleshooting
===============

  * The solutions may fail on build if the NuGet packages are not restored before building. If so, you can follow these steps:

     - Open the Visual Studio package manager console. You will find it under: 
       Tools > Library package manager > Package manager console.

     - At the top of the console window you will see the following message: 
       “Some NuGet packages are missing from this solution. Click to restore from your online package source”. 

       Click the “Restore” button and the packages will download into your solution.

     - You can also configure Visual Studio so that it allows the download of NuGet packages during project compilation. 
       You can do this by checking the box found at: Tools > Options > Package Manager > General > Allow NuGet to download missing packages.

     - Everything should work fine now.


  * Some examples, such as SignalR clients for Windows 8 and WP8, may require you to run Visual Studio as 
    a system administrator in order to avoid problems with permissions.



