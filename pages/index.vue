<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="10" lg="8">
        <v-card>
          <v-card-title class="headline">
            Welcome to the car fingerprint prototype
          </v-card-title>
          <v-card-text>
            <p>
              It has already been shown in the past that cyberattacks are more
              successful the more the attacker knows about the system to be
              attacked. If someone knows a vulnerability in a certain software
              and version combination, it is easy to exploit this vulnerability
              for attacks. To gain this knowledge, fingerprinting methods are
              often used to identify the hardware and software used in a system
              in order to launch targeted attacks. Due to the increasing number
              of internet-enabled vehicles, the growing threat of cyberattacks
              on vehicles and the experiences in the cybersecurity field
              regarding fingerprinting in the past, this prototype investigates
              what data can be extracted by visiting a website via the vehicle's
              internal browser. It is further investigated whether it is
              possible to create a specific fingerprint based on this data that
              can distinguish between manufacturer, model and software version
              of the vehicle.
            </p>
            <p>
              Under
              <nuxt-link to="/save-car">Save Car</nuxt-link>
              you can help to expand our database by adding the publicly
              available browser data to our database and thus enable a more
              detailed analysis of the above mentioned topic.
            </p>
            <p>
              Do you just want to check if your vehicle is recognized? Go to
              <nuxt-link to="/check-car">Check Car</nuxt-link>
            </p>
            <p>
              The finished paper is available here:
              <a href="https://drive.google.com/file/d/1OgOSsG3YOXV0-uomKdblOLizne1BVigH/view?usp=sharing" target="_blank" rel="noopener noreferrer">Link to paper</a>
            </p>
            <p>
              If you have any questions, feel free to leave me a message.<br />
              <a
                href="mailto:ic18m020@technikum-wien.at"
                rel="noopener noreferrer"
                title="Contact"
                >ic18m020@technikum-wien.at</a
              >
            </p>
            <p>
              Find a bug? Report it on the github
              <a
                href="https://github.com/thomas4Bitcraft/connected-car-fingerprinting/issues"
                target="_blank"
                rel="noopener noreferrer"
                title="contribute"
                >issue board</a
              >.
            </p>
            <p>
              Thank you for participating in the research to increase the safety
              of connected vehicles.
            </p>
            <div class="text-xs-right">
              <em><small>&mdash; Thomas Brandauer</small></em>
            </div>
            <card-footer />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
