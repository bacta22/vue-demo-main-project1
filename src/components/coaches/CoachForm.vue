<template>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" v-model.trim="firstName" />
        </div>
        <div class="form-control">
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" v-model.trim="lastName" />
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <textarea id="description" v-model.trim="description"></textarea>
        </div>
        <div class="form-control">
            <label for="rate">Hourly Rate</label>
            <input type="number" id="rate" v-model.number="rate" />
        </div>
        <div class="form-control">
            <h3>Areas of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas" />
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas" />
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas" />
                <label for="career">Career Advisory</label>
            </div>
            <base-button>Register</base-button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            description: '',
            rate: null,
            areas: []
        }
    },
    methods: {
        submitForm() {
            const formData = {
                first: this.firstName,
                last: this.lastName,
                desc: this.description,
                rate: this.rate,
                areas: this.areas
            };
            this.$store.dispatch('coaches/addCoach', formData);
            this.$router.push('/coaches');
        }
    }
}
</script>