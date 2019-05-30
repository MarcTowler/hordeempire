const ytdl = require('ytdl-core');

module.exports = class {
    constructor (client) {
      this.client = client;
    }
  
    async run (oldMember, newMember) {
        let newUserChannel = newMember.voiceChannel;
        let oldUserChannel = oldMember.voiceChannel;

        if(oldUserChannel === undefined && newUserChannel !== undefined)
        {
            if(newUserChannel.guild.ownerID === newMember.user['id'])
            {
                try {
                    var connection = await newMember.voiceChannel.join();
                } catch(error) {
                    console.error(`I could not join the voice channel: ${error}`);
                }

               // console.log(connection);

                const dispatcher = connection.playStream(ytdl(settings.yt_playlist))
                    .on('end', () => {
                        console.log('Song ended!');
                        newMember.voiceChannel.leave();
                    })
                    .on('error', error => {
                        console.error(error);
                    });

                dispatcher.setVolumeLogarithmic(5 / 5);
            }
            //joined a channel
        } else if(newUserChannel === undefined) {
            //left a channel
            if(oldUserChannel.guild.ownerID === oldMember.user['id'])
            {
                dispatcher.end();
            }
        } else {
            //changed channel
        }
    }
};