angular.module('tabsApp', [])
.directive('tab', tab)
.directive('tabs', tabs);

function tabs() {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        controller: function () {
            this.tabs = [];

            this.addTab = function addTab(tab) {
                this.tabs.push(tab);
            };

            this.selectTab = function selectTab(index) {
                for (var i = 0; i < this.tabs.length; i++) {
                    this.tabs[i].selected = false;
                }
                this.tabs[index].selected = true;
            };
        },
        controllerAs: 'tabs',
        templateUrl: "tabs.html",
        link: function ($scope, $element, $attrs, $ctrl) {
            // set the first tab to show first
          //  $ctrl.selectTab(0);
            $ctrl.selectTab($attrs.sel || 0);
            console.log($attrs);
        }
    };

}

function tab() {
    return {
        restrict: 'E',
        scope: {
            label: '@'

        },
        require: '^tabs',
        transclude: true,
        template: '<div class="tabs__content" ng-if="tab.selected"> ' +
                        '<div ng-transclude></div> ' +
                    '</div>'
    ,
        link: function ($scope, $element, $attrs, $ctrl) {
            $scope.tab = {
                label: $scope.label,
                selected: false
            };
            $ctrl.addTab($scope.tab);
            console.log($ctrl);
        }
    };
}